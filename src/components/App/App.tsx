import { FC, useState, useEffect, useMemo} from 'react';
import app from './App.module.scss';
import share from "../../images/share.png";

import {AgGridReact} from 'ag-grid-react';
import {
  CellValueChangedEvent,
  ColDef,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import { Header } from '../Header/Header';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypeSelector';
import { getQuantity, getRowData } from '../../services/ActionCreators/rowDataActions';
import { IRowData } from '../../interface/IRowData';

/*
  Изначально ключ, который был представлен в ТЗ, был недействителен, о чем я сообщил вам. 
  После этого вы предоставили два ключа. Один на новый API, второй - старый. Оба ключа работают,
  но на новый API, в режиме разработки сервер блокирует запросы из-за cors. Позднее и старое API
  также стало блокировать запросы (картинка с ошибкой '../../images/errors/cors.JPG')

  В связи с чем, я получил данные отчета и данные одного товара через Postman, скопировал данные в папку utils и использовал, как моковые данные.
  Однако в проекте есть логика получения данных по nm_id товару и заменяет название и остаток (код закоментирован).
  Также реализован запрос по выбору даты отчетного периода (код также закоментирован).
  Проверить правильность выполнения кода с запросами не представляется возможным по указанной выше причине.
  При выполнении сделан акцен на логику, поэтому оформлением внешнего вида я особо не занимался.
*/


const App: FC = () => {
  const d = new Date();
  d.setDate(d.getDate()-30)
  const [dateRange, setDateRange] = useState([d, new Date()]);
  const [startDate, endDate] = dateRange;

  const { rowData, rowDataWithQuantity } = useAppSelector(store => store.rowData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const dateStart = new Intl.DateTimeFormat().format(startDate).split('.')
    const dateEnd = new Intl.DateTimeFormat().format(endDate).split('.')
    dispatch(getRowData({
      startDate: `${dateStart[2]}-${dateStart[1]}-${dateStart[0]}`,
      endDate: `${dateEnd[2]}-${dateEnd[1]}-${dateEnd[0]}`
    }))
  }, [])

  useEffect(() => {
  }, [endDate])

  useEffect(() => {
    if(rowData.length > 0) {
      rowData.forEach((item: IRowData) => {
        dispatch(getQuantity(item.nm_id))
      })
    }
  }, [rowData])

  const handleChangeDate = (update: [Date, Date]) => {
    setDateRange(update);
    const dateStart = new Intl.DateTimeFormat().format(startDate).split('.')
    const dateEnd = new Intl.DateTimeFormat().format(endDate).split('.')

    if (dateRange[1] !== null) {
      dispatch(getRowData({
        startDate: `${dateStart[2]}-${dateStart[1]}-${dateStart[0]}`,
        endDate: `${dateEnd[2]}-${dateEnd[1]}-${dateEnd[0]}`
      }))
    }
  }

  const SKURender = (item: CellValueChangedEvent) => {
    const onClick = () => window.alert(`Значение ${item.value}`)
    return (
      <>
        <button onClick={onClick} type='button' className={app.app__button}>
          <img className={app.app__image} src={share} alt="Поделиться артикулом" />
        </button>
        {item.value}
      </>
    )
  }

  const renderImage = (item: CellValueChangedEvent) => {
    const sliceId = (a: number, b: number) => {
      return String(item.value).split('').slice(a, b).join('')
    }
    return(
      //Не совсем ясно, как использовать ссылку для фотографии и каким обрзаом применять артикул каждого товара.
      //Сделал таким образом, как представлено ниже, однако фотографии програжуются не для всех товаров, соответственно в консоль выходит 404 ошибка.
      //Если заменить только конец строки, то ситуация аналогичная
      <div style={
        {
          backgroundImage: `url(https://basket-08.wb.ru/vol${sliceId(0, 4)}/part${sliceId(0, 6)}/${item.value}/images/c246x328/1.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          width: "25px",
          height: "25px",
        }
      }>
      </div>
    )
  }

  const renderRub = (i: CellValueChangedEvent) => <>{i.value} &#8381;</>

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {headerName: 'фото', field: 'nm_id', width: 80, checkboxSelection: true, cellRenderer: renderImage},
    {headerName: 'SKU', field: 'nm_id', filter: true, cellRenderer: SKURender},
    {headerName: 'Название', field: 'subject_name', filter: true, width: 200},
    {headerName: 'Бренд', field: 'brand_name', filter: true, width: 150},
    {headerName: 'Наличие', field: 'quantity', filter: true, cellStyle: {'text-align': 'end'}},
    {headerName: 'Цена', field: 'retail_price', filter: true, cellStyle: {'text-align': 'end'}, cellRenderer: renderRub},
    {headerName: 'Продаж', field: 'retail_amount', filter: true, cellStyle: {'text-align': 'end'}},
    {headerName: 'Выручка', field: 'ppvz_for_pay', filter: true, cellStyle: {'text-align': 'end'}, sort: 'desc', cellRenderer: renderRub},
    {headerName: 'График продаж', field: 'nm_id'},
  ]);

  const defaultColDef = useMemo(() => ({
    floatingFilter: true,
    enableRowGroup: true,
    width: 120,
    sortable: true,
  }), [])

  return (
    <>
    <Header onChange={handleChangeDate} startDate={startDate} endDate={endDate}/>
      <div className='ag-theme-balham-dark' style={{height: 500}}>
        <AgGridReact
          rowData={rowDataWithQuantity}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection='multiple'
          animateRows={true}
        />
      </div>
    </>
  );
}

export default App;

import { createAsyncThunk } from '@reduxjs/toolkit'
import { getNameAndQuantityData, getRowDataRequest } from '../../utils/fakeApi';
import { getQuantityApi, getRowDataFromServer } from '../../utils/api';
import { IDataFromApi } from '../../interface/IDataFromApi';
import { TNameAndQuantityData } from '../../utils/nameAndQuantityData';

export const getRowData = createAsyncThunk(
  'rowData/getRowData',
  async ({startDate, endDate}: IDataFromApi, thunkApi) => {
    try {
      const res: any = getRowDataRequest()
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
)

// Закоментированный код - запрос на сервер для получения отчетных данных (Запросы блокируются)
// Если использовать его, то код выше необходимо закоментировать.

// export const getRowData = createAsyncThunk(
//   'rowData/getRowData',
//   async ({startDate, endDate}: IDataFromApi, thunkApi) => {
//     try {
//       const res = await getRowDataFromServer(startDate, endDate)
//       return res;
//     } catch (e) {
//       return thunkApi.rejectWithValue(e);
//     }
//   }
// )

export const getQuantity = createAsyncThunk(
  'rowData/getQuantity',
  async (nm_id: number, thunkApi) => {
    try {
      // На запрос на сервер для получения остатка для каждого товара получаю ошибку cors (картинка с ошибкой '../../images/errors/quantity-cors.JPG')
      // const res = await getQuantityApi(nm_id);

      const res: any = getNameAndQuantityData();
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
)
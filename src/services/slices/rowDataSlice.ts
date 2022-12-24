import { createSlice } from "@reduxjs/toolkit";
import { getQuantity, getRowData } from "../ActionCreators/rowDataActions";
import { IRowData } from "../../interface/IRowData";

interface IRowDataState {
  rowData: IRowData[];
  rowDataWithQuantity: IRowData[];
  pending: boolean;
}

const rowDataSlice = createSlice({
  name: 'rowData',
  initialState: {
    rowData: [],
    rowDataWithQuantity: [],
    pending: false,
  } as IRowDataState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getRowData.pending, (state) => {
      state.pending = true;
    })
    .addCase(getRowData.fulfilled, (state, action) => {
      state.pending = false;
      const res = action.payload.reduce((acc: IRowData[], val: IRowData) => {
        if (val.nm_id in acc) {
          acc[val.nm_id].quantity += val.quantity;
          acc[val.nm_id].retail_amount += val.retail_amount;
          acc[val.nm_id].ppvz_for_pay += val.ppvz_for_pay;
          if (val.quantity !== 0) {
            acc[val.nm_id].retail_price = val.retail_price;
          }
          return acc;
        }
        
        return {...acc, [val.nm_id]: {...val}}
      }, {})
      const result: IRowData[] = Object.values(res).map((item: any) => {
        return {...item, retail_amount: item.retail_amount.toFixed(0), ppvz_for_pay: item.ppvz_for_pay.toFixed(2)}
      });

      state.rowData = result;
    })
    .addCase(getRowData.rejected, (state, action) => {
      console.log(action.payload);
    })

    .addCase(getQuantity.pending, (state) => {
      state.pending = true;
    })
    .addCase(getQuantity.fulfilled, (state, action) => {
      const res = action.payload.data.products[0];
      state.pending = false;

//// этот код выполнит поиск по артикулу, который предоставлен в ТЗ, соответственно заменит поля только в одной строке
      state.rowDataWithQuantity = state.rowData.map((item) => {
        let quantity = 0;
        if(item.nm_id === res.id) {
          item.subject_name = res.name;
          res.sizes.forEach((item: any) => {
            item.stocks.forEach((i: any) => {
              quantity += i.qty;
            })
          })
          item.quantity = quantity;
        }
        return item
      });

// или если заполнить все поля одним и тем же значением, т.е. товаром, который предоставлен в ТЗ
// то выполнить этот код
      // state.rowDataWithQuantity = state.rowData.map((item) => {
      //   let quantity = 0;
      //     item.subject_name = res.name;
      //     res.sizes.forEach((item: any) => {
      //       item.stocks.forEach((i: any) => {
      //         quantity += i.qty;
      //       })
      //     })
      //     item.quantity = quantity;
      //   return item
      // });
    })
    .addCase(getQuantity.rejected, (state, action) => {
      state.pending = false;
      console.log(action.payload);
    })
  },
});

export default rowDataSlice.reducer;
import { getdata, getList, postData } from './ApiService';
import CompService from './CompService';

const Util = {
  Component: CompService,
  PostData: postData,
  getdata: getdata,
  getList: getList,
};
export default Util;

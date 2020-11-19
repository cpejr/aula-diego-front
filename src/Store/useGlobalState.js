import { AccessTimeOutlined } from '@material-ui/icons';
import {useState} from 'react'

const useGlobalState = () =>{

  

    const [state,setState] = useState({value:'vitor',list:[]});


    const actions = (action) =>{
        const {type,payload} = action;
        switch(type){
            case 'setState':
                return setState(payload);

            default: 
                return state;    
        }
    }
    return{state,actions}
}


export default useGlobalState
import Web3 from 'web3'
import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'

export default function Updater() {
  const { chainId, library } = useWeb3React()

  useEffect(() => {
    const web3 = new Web3(library)
    // console.log(web3)
    var subscription = web3.eth.subscribe('logs', {
      address: '0xD223eFfE61C4224BD02D0F891EDe047D631e0348',
      topics: ['0x69ca02dd4edd7bf0a4abb9ed3b7af3f14778db5d61921c7dc7cd545266326de2']
    }, function(error, result){
        if (!error)
            console.log("logs=", result);
    })
    .on("connected", function(subscriptionId){
        console.log("connected log=", subscriptionId);
    })
    .on("data", function(log){
        console.log("data log=", log);
    })
    .on("changed", function(log){
        console.log("changed log=", log);
    });
    
    return () => {
      // unsubscribes the subscription
      subscription.unsubscribe(function(error, success){
          if(success)
              console.log('Successfully unsubscribed!');
      });
    }

  }, [chainId, library])

  return null
}

import { Text ,Box ,Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNFTBalances } from "react-moralis";
import { useMoralis } from "react-moralis"

export default function Nft(){
    const { isAuthenticated, authenticate, user, logout, isLoggingOut } =
    useMoralis()
    const {getNFTBalances , data} = useNFTBalances()

    useEffect( ()=> {
        getNFTBalances({
            params:{
                chain: "ropsten",
                address:user.get('ethAddress')
            }
        })
    },[])
    console.log(data)
    return(
     <>gdgd</>
            // <Text fontSize="xl" fontWeight="bold" >My NFTs</Text>
            // {data && data.result.map(nft=> (
            //     <Box mt="4" px="2" py="2" borderWidth="1px" borderRadius="md" key={nft.block_number_minted}>
            //         {nft.image && <Image src={nft.image} /> }
            //         <p>{nft.token_uri}</p> 
            //     </Box>
            // ))}
    
    )
}
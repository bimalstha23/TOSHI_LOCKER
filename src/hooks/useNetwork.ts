import { useContext } from 'react';
import { NetworkContext, NetworkContextType } from '../provider/NetworkProvider';


// ----------------------------------------------------------------------

const useNetwork = () => useContext(NetworkContext) as NetworkContextType;

export default useNetwork;

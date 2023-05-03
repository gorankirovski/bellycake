import Package from '../Product/Package';
import { useSelector } from "react-redux";

const Cta = () => {
    const { products } = useSelector(state => state.products);
    const product = products.find(product => product.seller === "Package");
    
    if (product && product.images && product.images.length > 0) {
        return <Package product={ product } />;
    }
    return null;
    
}

export default Cta;

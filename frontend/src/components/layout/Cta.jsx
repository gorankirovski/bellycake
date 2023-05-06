import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productActions";
import { toast } from "react-hot-toast";
import { Loader, MetaData } from "../allComponents";
import Package from '../Product/Package';

const Cta = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const { product, loading: productLoading, error: productError } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    setLoading(true);
    dispatch(getProductDetails("644df4f0d3e647ed3c0fe40c")).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (productError) {
      setError(productError);
      toast.error(productError, {
        className: "myToast",
      });
    }
  }, [productError]);

  if (loading || productLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (product && product.images && product.images.length > 0) {
    return <Package product={product} />;
  }

  return null;
};

export default Cta;

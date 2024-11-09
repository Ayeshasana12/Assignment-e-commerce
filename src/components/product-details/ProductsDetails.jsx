import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ProductsDetails = () => {
  const [productsDetails, setProductsDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const param = useParams();
  console.log(productsDetails, 'productsDetails');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const products = await
          axios.get(`https://fakestoreapi.com/products/${param?.product_id}`);

        if (products.status === 200) {
          setIsLoading(false);
          setProductsDetails(products?.data);
        } else {
          setIsLoading(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);


  return (
    <>
      {isLoading ? (
        <Box className="text-center mt-5">
          <CircularProgress color="inherit" />
        </Box>
      ) :
        <Grid container className='container border my-5 
        d-flex justify-content-center align-items-center'>
          <Grid item md={6}>
            {
              <img className='border p-5 rounded-2 shadow  '
                width={"300px"} src={productsDetails?.image} alt="" />
            }
          </Grid>
          <Grid item md={6}>
            <Typography variant='h3' className='fw-semibold text-success'>{productsDetails?.category}</Typography>
            <Typography variant='h5' className='pt-3 fw-semibold'>{productsDetails?.title}</Typography>
          </Grid>

        </Grid>}
    </>
  )
}

export default ProductsDetails;
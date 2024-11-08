import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Snackbar,
  SnackbarContent,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./AllProduct.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

function AllProduct() {
  const [cartList, setCartList] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [products, setProducts] = useState([]);
  console.log(products, "products");

  const cartHandler = (product) => {
    const isExist = cartList.find((cart) => cart.id === product.id);
    if (!isExist) {
      setCartList((prev) => [...prev, product]);
    } else {
      setOpenAlert(true);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  const searchHandler = (event) => {
    if (event.target.value === "") {
    } else {
      const filteredArr = products?.filter((product) =>
        product?.name.toLowerCase().includes(event?.target?.value.toLowerCase()));

      setProducts(filteredArr);
      console.log(filteredArr);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await axios.get("https://fakestoreapi.com/products");

        setProducts(products?.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);


  return (
    <>
      <Box className="container mt-3">
        <TextField onChange={searchHandler} size="small" placeholder="Search Items..." />
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <SnackbarContent
          style={{
            backgroundColor: "#bb2124",
          }}
          message={
            <Box>
              <span id="client-snackbar">Product Already Added to Cart List</span>
              <CloseIcon className="ms-5" onClick={handleClose} />
            </Box>
          }
        />
      </Snackbar>
      <Grid container
        className="container mt-5">
        {products.map((product) => (
          <Grid item xs={12} md={3} mb={2}>
            {/*  sx={{minHeight:"250px", maxHeight: "350px", border:"1px solid red"}} */}
            <Card key={product.id} sx={{ padding: "20px", width: "250px" }}>
              <Box>
                <Box className="text-center">
                  <img 
                  style={{maxHeight: "140px", minHeight: "140px"}}
                  className="product-img " width={100}
                    src={product.image} alt={product.name} />
                </Box>
                <Tooltip title={product?.title} placement="top">
                <Typography className="mt-3 fw-semibold" variant="body1">
                  {product?.title?.length 
                  >= 22 ? `${product?.title?.slice(0, 18)}...` 
                  : product?.title}
                </Typography>
                </Tooltip>
                <Divider className="mt-2" sx={{ borderColor: "#333" }} variant="fullWidth" />
                <Box className="d-flex justify-content-between mt-2">
                  <ShareIcon />
                  <FavoriteIcon />
                  <AddShoppingCartIcon onClick={() => cartHandler(product)} />
                </Box>
              </Box>
            </Card>
          </Grid>
        )
        )};
      </Grid>
    </>
  );
}

export default AllProduct;












import {
    Box,
    Button,
    Card,
    Divider,
    IconButton,
    Snackbar,
    SnackbarContent,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import Product1 from "../../assets/img-1.jpeg";
  import Product2 from "../../assets/img-2.jpeg";
  import Product3 from "../../assets/img-3.jpeg";
  import "./AllProduct.css";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import ShareIcon from "@mui/icons-material/Share";
  import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
  import CloseIcon from "@mui/icons-material/Close";
  
  const dummyProducts = [
    {
      id: 1,
      img: Product1,
      name: "Lay's Chips",
      Price: "10",
    },
    {
      id: 2,
      img: Product2,
      name: "Potato Chips",
      Price: "12",
    },
    {
      id: 3,
      img: Product3,
      name: "Ruffles Chips",
      Price: "15",
    },
  ];
  
  function AllProduct() {
    const [cartList, setCartList] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [products, setProducts] = useState(dummyProducts); // Remove extra array layer here
  
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
      if(event.target.value === ""){
        setProducts(dummyProducts);
      } else {
          const filteredArr = dummyProducts?.filter((product) =>
             product?.name.toLowerCase().includes(event?.target?.value.toLowerCase()));
             
          setProducts(filteredArr);
          console.log(filteredArr); 
      }
  };
 
    useEffect(() => {
      if (cartList.length > 0) {
        localStorage.setItem("cartList", JSON.stringify(cartList));
      }
    }, [cartList]);
  
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
        <Box sx={{ display: "flex", gap: "50px", cursor: "pointer" }} className="container mt-5">
          {products.map((product) => (
            <Card key={product.id} sx={{ padding: "20px", width: "250px", marginRight: "55px" }}>
              <Box>
                <Box className="text-center">
                  <img className="product-img bg-danger" width={100} src={product.img} alt={product.name} />
                </Box>
                <Typography className="mt-4" variant="h6">
                  {product.name}
                </Typography>
                <Divider className="mt-2" sx={{ borderColor: "#333" }} variant="fullWidth" />
                <Box className="d-flex justify-content-between mt-2">
                  <ShareIcon />
                  <FavoriteIcon />
                  <AddShoppingCartIcon onClick={() => cartHandler(product)} />
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      </>
    );
  }
  
  export default AllProduct;
  
  

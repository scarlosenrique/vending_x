import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import {
  addToOrder,
  clearOrder,
  listCategories,
  listProducts,
  removeFromOrder,
} from '../actions.js';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogTitle,
  Grid,
  List,
  ListItem,
  Slide,
  TextField,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Alert } from '@material-ui/lab';
import { useStyles } from '../styles';
import Logo from '../components/Logo';


export default function OrderScreen(props) {
  const styles = useStyles();
  const { state, dispatch } = useContext(Store);
  
  const { categories, loading, error } = state.categoryList;
  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
  } = state.productList; 
  const {
    orderItems,
    itemsCount,
    totalPrice,
    /* taxPrice,
    orderType, */
  } = state.order;

  const [categoryName, setCategoryName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({});


  const closeHandler = () => {
    setIsOpen(false);
  };
  const productClickHandler = (p) => {
    setProduct(p);
    setIsOpen(true);
  };
  const addToOrderHandler = () => {
    addToOrder(dispatch, { ...product, quantity });
    setIsOpen(false);
  };
  const cancelOrRemoveFromOrder = () => {
    removeFromOrder(dispatch, product);
    setIsOpen(false);
  };
  const previewOrderHandler = () => {
    props.history.push(`/review`);
  };

  /* UseEFFECT para cargar las categorias */
  useEffect(() => {
    if (!categories) {
      listCategories(dispatch);
    } else {
      listProducts(dispatch, categoryName);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, categoryName]);
  

  const categoryClickHandler = (name) => {
    setCategoryName(name);
    listProducts(dispatch, categoryName);
  };


/*  LAYOUT MATERIAL UI */

  return (
    <Box className={styles.root}>


      <Box className={styles.main}>

        <Dialog  onClose={closeHandler} aria-labelledby="max-width-dialog-title" open={isOpen} fullWidth={true} maxWidth="sm" >
          <DialogTitle className={styles.center}>
            Agregar {product.name}
          </DialogTitle>

          <Box className={[styles.row, styles.center]}>
            <Button
              variant="contained"
              color="primary"
              disabled={quantity === 1}
              onClick={(e) => quantity > 1 && setQuantity(quantity - 1)}
            >
              <RemoveIcon />
            </Button>
            
            <TextField inputProps={{ className: styles.smallInput }}
              InputProps={{
                bar: true,
                inputProps: {
                className: styles.largeInput,
                },
              }}
              className={styles.largeNumber}
              type="number"
              variant="filled"
              min={1} value={quantity}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => setQuantity(quantity + 1)}
            >
              <AddIcon />
            </Button>
          </Box>

          <Box className={[styles.row, styles.around]}>
            <Button
              onClick={cancelOrRemoveFromOrder}
              variant="contained"
              color="primary"
              size="large"
              className={styles.smallButton}
            >
              {orderItems.find((x) => x.name === product.name)
                ? 'Remove From Order'
                : 'Cancel'}
            </Button>

            <Button
              onClick={addToOrderHandler}
              variant="contained"
              color="secondary"
              size="large"
              className={styles.smallButton}
            >
              AGREGAR
            </Button>
          </Box>

        </Dialog>

{/* GRILLA DE PRODUCTOS */}
        <Grid container>

          <Grid item md={2}>
            <List>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <>
                  <ListItem button onClick={() => categoryClickHandler('')}>
                    <Logo></Logo>
                  </ListItem>
                  {categories.map((category) => (
                    <ListItem key={category.name} button onClick={() => categoryClickHandler(category.name)} >
                      <Avatar alt={category.name} src={category.image} />
                    </ListItem>
                  ))}
                </>
              )}
            </List>
          </Grid>

          <Grid item md={10}>
            <Typography
              gutterBottom
              className={styles.title}
              variant="h2"
              component="h2"
            >
              {categoryName || 'Lista de Productos '}
            </Typography>

            <Grid container spacing={1}>
              {loadingProducts ? (
                <CircularProgress />
              ) : errorProducts ? (
                <Alert severity="error">{errorProducts}</Alert>
              ) : (
                products.map((product) => (
                  <Slide key={product.name} direction="up" in={true}>
                    <Grid item md={6}>
                      <Card
                        className={styles.card}
                        onClick={() => productClickHandler(product)}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            alt={product.name}
                            image={product.image}
                            className={styles.media}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="body2"
                              color="textPrimary"
                              component="p"
                            >
                              {product.name}
                            </Typography>
                            <Box className={styles.cardFooter}>
                              <Typography variant="body2" color="textSecondary" component="p" >
                                {product.calorie} Cal
                              </Typography>
                              <Typography variant="body2" color="textPrimary" component="p">
                                ${product.price}
                              </Typography>
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  </Slide>
                ))
              )}
            </Grid>
          </Grid>

        </Grid>
      </Box>

      <Box>
        <Box>
{/* FIN GRILLA PRODUCTOS */}

{/* BARRA DE ESTADO - PRECIO + ITEMS */}
          <Box className={[styles.bordered, styles.space]}>
            <strong>Mi PEDIDO</strong> {/* orderType */} - - - - - - - - - - <strong>Productos: </strong> {itemsCount} - {/* IGV:  $*/} {/* taxPrice */} - - - - - - - - - - - -  <strong> TOTAL A PAGAR: </strong>${totalPrice}           
          </Box>
{/* FIN BARRA DE ESTADO */}

{/* VENTANA DE CONFIRMACION - CANCEL + CONFIRMAR */}
          <Box className={[styles.row, styles.around]}>

            <Button
              onClick={() => {
                clearOrder(dispatch);
                props.history.push(`/`);
              }}
              variant="contained"
              color="primary"
              className={styles.largeButton}
            >
              CANCELAR PEDIDO
            </Button>

            <Button
              onClick={previewOrderHandler}
              variant="contained"
              color="secondary"
              disabled={orderItems.length === 0}
              className={styles.largeButton}
            >
              CONFIRMAR
            </Button>

          </Box>
{/* FIN VENTANA DE CONFIRMACION */}        
        </Box>
      </Box>

    </Box>
  );
}

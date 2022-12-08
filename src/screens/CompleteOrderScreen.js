import React, { useContext, useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { useStyles } from '../styles';
import Logo from '../components/Logo';
import { Store } from '../Store';
import { Alert } from '@material-ui/lab';
import { createOrder } from '../actions';
import QrCode from "../components/QrCode";


export default function CompleteOrderScreen(props) {
  const styles = useStyles();
  const { state, dispatch } = useContext(Store);
  const { order } = state;
  const { loading, error, newOrder } = state.orderCreate;

  useEffect(() => {
    if (order.orderItems.length > 0) {
      createOrder(dispatch, order);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  return (
    <Box className={[styles.root, styles.navy]}>

      <Box className={[styles.main, styles.center]}>

        <Box>
          <Logo large></Logo>

          {loading ? ( <CircularProgress></CircularProgress> ) : error ? (  <Alert severity="error">{error}</Alert> ) : 
          (
            <>
                <Typography gutterBottom className={styles.title} variant="h3" component="h3" >
                  Su Compra fue exitosa!
                </Typography>
                <Typography gutterBottom className={styles.title} variant="h1" component="h1" >
                  Gracias!
                </Typography>
                <Box className={[styles.main, styles.navy, styles.center]}>
                    <QrCode />
                </Box>

                <Typography gutterBottom className={styles.title} variant="h3" component="h3" >
                  Su Codigo de Compra: {newOrder.number + 'xy612'}
                </Typography>
            </>
          )}
        </Box>

      </Box>

      <Box className={[styles.center, styles.space]}>
        <Button onClick={() => props.history.push('/')} variant="contained" color="primary" className={styles.largeButton} >
          Nueva Compra
        </Button>
      </Box>

    </Box>
  );
}

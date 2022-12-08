import React from 'react';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { useStyles } from '../styles';
import Logo from '../components/Logo';
export default function CompleteOrderScreen(props) {
  const styles = useStyles();

  return (
    <Box className={[styles.root, styles.navy]}>
      <Box className={[styles.main, styles.center]}>
        <Box>
          <Logo large></Logo>
          <Typography
            gutterBottom
            className={styles.title}
            variant="h3"
            component="h3"
          >
            Confirme abono al<br></br> cel 934307646 <br></br>para verificar
          </Typography>
          <CircularProgress />
        </Box>
      </Box>
      <Box className={[styles.center, styles.space]}>
        <Button
          onClick={() => props.history.push('/complete')}
          variant="contained"
          color="primary"
          className={styles.largeButton}
        >
          Pago efectuado
        </Button>
      </Box>
    </Box>
  );
}

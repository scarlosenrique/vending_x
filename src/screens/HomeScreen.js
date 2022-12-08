import React from 'react';
import { Box, Card, CardActionArea, Typography } from '@material-ui/core';
import TouchAppIcon from '@material-ui/icons/TouchApp';

import { useStyles } from "../styles";
import Logo from "../components/Logo";

export default function HomeScreen(props) {
  const styles = useStyles();
  return (
    <Card>
      <CardActionArea onClick={() => props.history.push("/choose")}>

        <Box className={[styles.root, styles.red]}>

          <Box className={[styles.center, styles.green]}>
            <Logo large />
            <Typography variant="h5" component="h5" className={styles.header}>
                ExpendShop
            </Typography>
          </Box>

          <Box className={[styles.main, styles.center]}>
            <Typography variant="h6" component="h6">
              Elija y llevelo
            </Typography>
            <Typography variant="h1" component="h1" className={styles.bold}>
              Compre <br />
              Sin Colas
              <br />
              Aqui
            </Typography>
            <TouchAppIcon fontSize="large"></TouchAppIcon>
          </Box>

          <Box className={[styles.center, styles.green]}>
            <Logo large />
            <Typography variant="h5" component="h5" className={styles.footer}>
              Toque Para empezar
            </Typography>
          </Box>

        </Box>

      </CardActionArea>
    </Card>
  );
}

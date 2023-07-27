import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ResponsiveAppBar from '../../nav/Navbar';
import ItemService from '../../../service/ItemService';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./home.scss";

const BASE_IMAGE_URL = 'http://localhost:3001/uploads/';

const Home = () => {

  const [dataArray, setDataArray] = useState([]);

  const loadData = async () => {
    let res = await ItemService.fetchItems();
    if (res.status === 200) {
      setDataArray(res.data.data);
    } else {
      console.log("fetching error: " + res)
    }
  };

  useEffect(() => {
    loadData();
  }, []);


  return (
    <Fragment>
      <div className='container'>
        <div className='nav-bar'>
          <ResponsiveAppBar />
        </div>
        <div className='content'>
          <div className='content-box'>
            <Grid container spacing={{ xs: 2, md: 3 }} style={{ padding: '10px', paddingTop: '20px', paddingBottom: '20px' }} columns={{ xs: 6, sm: 12, md: 12 }} >
              {
                dataArray.map((card) => (
                  <Grid item xs={12} sm={4} md={3} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card sx={{ maxWidth: '97%' }}>
                      <CardActionArea>
                        <CardHeader
                          sx={{ backgroundColor: 'rgb(237, 238, 240)' }}
                          titleTypographyProps={{ variant: 'h6', style: { fontSize: '18px', textAlign: 'center' } }}
                          title={card.name}
                        />
                        <CardMedia
                          component="img"
                          height="300px"
                          image={BASE_IMAGE_URL + card.photo}
                          alt={card.photo}
                        />
                        <CardContent>
                          <Typography align="center" variant="body2" color="text.secondary">
                            {card.description}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'space-between' }} disableSpacing>
                          <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                          </IconButton>
                          <Link to={`/purchase/${card.id}`}>
                            <Button
                              aria-label="Add to Cart"
                              sx={{
                                border: '1px solid rgb(90, 161, 248)',
                              }}
                            >
                              <ShoppingCartIcon />
                              Add to Cart
                            </Button>
                          </Link>
                        </CardActions>

                      </CardActionArea>

                    </Card>
                  </Grid>
                ))
              }
            </Grid>
          </div>
        </div>
      </div>
    </Fragment >
  )
}

export default Home


import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { PlusOne, ShowerRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductItem({ product, grid }) {
  const theme = useTheme();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {grid ?
        <Card sx={{ maxWidth: 300 }}>

          <Link to={`/product-details/${product.id}`}><CardMedia

            component="img"
            height="150"
            image={product.data.imgURL}
            alt={product.data.name}
          /></Link>
          <CardContent sx={{ py: 1 }}>
            <Typography variant="h6" color="text.secondary">
            {`${product.data.name}`.substring(0,40).concat("..")}
            </Typography>
          </CardContent>
          <CardActions disableSpacing >
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <VisibilityIcon />
            </IconButton>

            <ExpandMore
            ><Button>Add to cart</Button>

            </ExpandMore>
          </CardActions>
        </Card> :

        (
          <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5" wrap>
                {`${product.data.name}`.substring(0,80).concat("..")}
                </Typography>
                <Typography sx={{ width: "500px" }} flexWrap variant="subtitle1" color="text.secondary" component="div">
                {`${product.data.description}`.substring(0,120).concat("..")}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, py: 1 }}>

                <CardActions disableSpacing >
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <VisibilityIcon />
                  </IconButton>

                  <ExpandMore
                  ><Button>Add to cart</Button>

                  </ExpandMore>
                </CardActions>

              </Box>
            </Box>
            <Link to={`/product-details/${product.id}`}><CardMedia

              component="img"
              sx={{ width: "100%"}}
              image={product.data.imgURL}
              alt={product.data.name}
            /></Link>
          </Card>
        )
      }
    </>

  );
}
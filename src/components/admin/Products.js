// react 
import { useState, useEffect } from 'react';
// material
import {
  Card, Table, Stack, Avatar, Button, TableRow, TableBody, TableCell, Typography, TableContainer,
  TablePagination, Box, TableHead, useMediaQuery, CircularProgress, Container, useTheme,
  Divider, OutlinedInput, InputAdornment, IconButton, FormControl, Grid, DialogActions,
  Dialog, TextField, DialogContent, Select, MenuItem, InputLabel, DialogTitle, ButtonGroup, Alert, LinearProgress
} from '@mui/material';
import Chip from '@mui/material/Chip';
import { AddBox, Delete, Edit, PlusOne, Search, UploadFile } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Snackbar from '@mui/material/Snackbar';
import RefreshIcon from '@mui/icons-material/Refresh';
import ClearIcon from '@mui/icons-material/Clear';
import ReactImageUploading from 'react-images-uploading';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { toast } from 'react-toastify';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import Loader from '../loader/Loader';
import Notiflix from 'notiflix';





export default function Products() {


  const [isLoading, setIsLoading] = useState(false)

  // all products
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    setIsLoading(true)
    try {

      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("createdAt", "desc"));
      const querySnap = await getDocs(q);
      let allProducts = [];
      querySnap.forEach((doc) => {
        return allProducts.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setProducts(allProducts);



      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)

    }
  }
  // single product: 
  //
  const categories = [
    {
      id: 1,
      name: "Laptop"
    },
    {
      id: 2,
      name: "Phone"
    },
    {
      id: 3,
      name: "Acceseries"
    },
    {
      id: 4,
      name: "Papers"
    }
  ]
  const [product, setProduct] = useState({
    name: "",
    imgURL: "",
    price: 0,
    category: "",
    brand: "",
    description: ""

  })
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })

  }

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    console.log(file.name)
    // date.now() add the time to the name of the images to avoid replacements of images thats has the same name
    const storageRef = ref(storage, `products/images/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress)
      },
      (error) => {
        toast.error(error.message)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imgURL: downloadURL })
          toast.success("image Uploaded successfully")
        });
      }
    );



  }

  const addProduct = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // add doc to firebase products collection:
    try {
      const docRef = await addDoc(collection(db, "products"), {
        name: product.name,
        imgURL: product.imgURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        description: product.description,
        createdAt: Timestamp.now().toDate()

      });
      setIsLoading(false)
      toast.success("product updated successfully")
      setUploadProgress(0)
      setProduct({
        name: "",
        imgURL: "",
        price: 0,
        category: "",
        brand: "",
        description: ""
      })
      getProducts()

    } catch (error) {
      setIsLoading(false)
      toast.error(error.message);

    }

  }
  // data
  const [loading, setLoading] = useState(false)
  const [loadingDialog, setLoadingDialog] = useState(false)
  const [selected, setSelected] = useState({})

  const reservation = [1, 2, 3]


  //table UI
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const theme = useTheme();

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;
  const [connectionErr, setConnectionErr] = useState(false)
  const [search, setSearch] = useState('')
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const TableHeadTitles = [
    { name: "#id" },
    { name: "Title" },
    { name: "Description" },
    { name: "Image" },
    { name: "Category" },
    { name: "Prix" },
    { name: "Actions" },
  ]
  ////////////////////////////////////////////////////////////

  // form of add 
  const [openAdd, setOpenAdd] = useState(false);
  const handleClickOpenAdd = () => {

    setOpenAdd(true);
  };

  const handleSubmitAdd = (e) => {
    addProduct(e)
    handleCloseAdd()

  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
///////////////////////////////////////////////////////
 // confirm  delete 
 const confirmDelete=(id, imgURL)=>{
  Notiflix.Confirm.show(
    'Confirm Delete',
    'Do you want to delete this product?',
    'Delete',
    'Cancel',
    function okCb() {
      deleteProduct(id, imgURL)
    },
    function cancelCb() {
      console.log('Cancelled')
    },
    {
      width: '320px',
      borderRadius: '8px',
      titleColor: "orangeRed",
      okButtonBackground:"orangeRed",
      cssAnimationStyle:"zoom"
      // etc...
    },
  );

 }
 


  // delete product
  const deleteProduct = async (id, imgURL) => {
    setIsLoading(false)
    try {
      await deleteDoc(doc(db, "products", id));
      // Create a reference to the file to delete
      const productImageRef = ref(storage, imgURL);
      // Delete the file
      await deleteObject(productImageRef)

      toast.success(`Product ${id} deleted`)
      setIsLoading(false)
      getProducts()

    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)

    }

  }







  /////////////////////////////////////////////////////////////////////////////

  // snackbar:
  const [openSnack, setOpenSnack] = useState(false);

  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };



  return (
    <>
      <Box>
        <Card>
          <Grid spacing={2}>
            <Grid xs={12} sx={{ padding: "10px" }}>
              <Stack sx={{ p: 1 }} direction="row" alignItems="center" justifyContent="space-between" >
                <Typography variant="h5" gutterBottom>
                  Products
                </Typography>
                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => { getProducts() }}
                    startIcon={<RefreshIcon />}
                  > Actualiser
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleClickOpenAdd}
                    startIcon={<PlusOne />}
                  >
                    Ajouter
                  </Button>
                </Box>

              </Stack>
              <Box sx={{ m: 1 }}>
                <FormControl sx={{ mx: 1, width: '50%' }} variant="outlined">
                  <OutlinedInput
                    size='small'
                    placeholder='Chercher'
                    type='text'
                    onChange={(e) => { setSearch(e.target.value) }}
                    value={search}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end">
                          <Search />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>

              </Box>
              {/* <Scrollbar> */}
              <TableContainer>
                <Table size='smaller'>
                  <TableHead sx={{ background: '#e9ecef' }}>
                    <TableRow>
                      {TableHeadTitles.map(e => {
                        return (<TableCell key={e.name} align="justify">{e.name}</TableCell>)
                      })}

                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {!isLoading && products
                      .filter(e => e.data.name.toLowerCase().includes(search.toLowerCase()))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        return (
                          <TableRow
                            hover
                            key={row.id}
                            tabIndex={-1}
                          >

                            <TableCell align="left"
                              component="th" scope="row" >
                              <Typography variant="subtitle2" noWrap>
                                #{index + 1}
                              </Typography>
                            </TableCell>

                            <TableCell align="left"
                              component="th" scope="row" >
                              <Typography variant="subtitle2" noWrap>
                                {row.data.name}
                              </Typography>
                            </TableCell>

                            <TableCell align="left"
                              component="th" scope="row" >
                              <Typography variant="subtitle2" noWrap>
                                {row.data.description}
                              </Typography>
                            </TableCell>

                            <TableCell align="left"
                              component="th" scope="row" >
                              <img style={{ width: "100px" }} src={row.data.imgURL} />
                            </TableCell>

                            <TableCell align="left"
                              component="th" scope="row" >
                              <Stack direction="row"  >
                                {row.data.category === "u" ? <Chip label={row.data.category} color="primary" /> :
                                  <Chip label={row.data.category} color="success" />
                                }

                              </Stack>
                            </TableCell>


                            <TableCell
                              component="th" scope="row" >
                              <Typography variant="subtitle2" noWrap>
                                {row.data.price} Dz
                              </Typography>

                            </TableCell>







                            <TableCell align="center">
                              <IconButton onClick={() => confirmDelete(row.id, row.data.imgURL)}>
                                <Delete />
                              </IconButton>
                              <IconButton>
                                <Edit />
                              </IconButton>
                            </TableCell>


                          </TableRow>
                        );
                      })}
                    {!isLoading && emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={8} />
                      </TableRow>
                    )}
                    {!isLoading && connectionErr && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={8} >
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <img width={90} alt="NETWORK PROBLEM" src="/static/assets/network-problem.png" />
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="h6" color="#383737"> Vérifier votre connexion internet et réessayer.</Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                    {isLoading && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={8} >
                          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3, pb: 1, px: 1 }}>

                            <CircularProgress />

                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'center', pb: 3, px: 1 }}>

                            <Typography variant="h6" color="#383737"> Chargement de contenu.</Typography>

                          </Box>

                        </TableCell>
                      </TableRow>
                    )}
                    {!isLoading && products.length === 0 && !connectionErr && (

                      <TableRow>
                        <TableCell colSpan={8} >
                          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, mt: 2 }}>

                            <img width={70} alt="NETWORK PROBLEM" src="/static/assets/no-result.png" />

                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                            <Typography variant="h6" color="#383737"> Aucune résultat.</Typography>

                          </Box>

                        </TableCell>
                      </TableRow>

                    )}
                  </TableBody>


                </Table>
              </TableContainer>
              {!isLoading && !connectionErr && products.length > 0 &&
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={products.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  labelRowsPerPage={"Element par page"}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />}
              {/* </Scrollbar> */}
            </Grid>
          </Grid>
        </Card>
      </Box>










      {/* add raison */}
      <Dialog
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">

        <DialogContent sx={{ padding: "10px 20px" }}>
          <Typography sx={{ fontSize: '20px', fontWeight: "bold" }}>
            Add A Product
          </Typography>
          <form >
            <TextField type="text" label="name" variant="outlined" fullWidth sx={{ margin: "10px 0" }}
              name="name" value={product.name} onChange={(e) => handleInputChange(e)} />

            <TextField type="number" label="price" variant="outlined" fullWidth sx={{ margin: "10px 0" }}
              name="price" value={product.price} onChange={(e) => handleInputChange(e)} />



            <Box fullWidth sx={{ margin: "10px 0", p: 2, border: "gray 1px solid" }}>
              {uploadProgress === 0 ? null :
                uploadProgress < 100 ? (
                  <Box sx={{ width: `${uploadProgress}%` }}>
                    <LinearProgress />
                  </Box>
                ) : <CheckCircleIcon sx={{ color: "green" }} />
              }

              <input
                type="file"
                accept="image/*"
                placeholder="Product Image"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />

              {product.imgURL === "" ? null : (
                <input
                  type="text"
                  // required
                  placeholder="Image URL"
                  name="imgURL"
                  value={product.imgURL}
                  disabled
                />
              )}


            </Box>
           


            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select name='category' value={product.category}
                onChange={(e) => handleInputChange(e)}>
                {categories.map((category) => {
                  return (
                    <MenuItem key={category.id} value={category.name} >{category.name}</MenuItem>

                  )
                })}

              </Select>
            </FormControl>

            <TextField type="text" label="brand" variant="outlined" fullWidth sx={{ margin: "10px 0" }}
              name="brand" value={product.brand} onChange={(e) => handleInputChange(e)} />

            <TextField
              type="text" label="description" variant="outlined" fullWidth sx={{ margin: "10px 0" }}
              name="description" value={product.description} onChange={(e) => handleInputChange(e)}
              multiline
              rows={4}
              defaultValue="Default Value"
            />

            <DialogActions>
              <Button onClick={handleCloseAdd} autoFocus>Cancel</Button>
              <Button onClick={handleSubmitAdd}>Ajouter</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {/*end add raison */}

      
    </>

  );
}
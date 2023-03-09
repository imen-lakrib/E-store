import { Button, Card, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { CountryDropdown } from 'react-country-region-selector';

function CheckoutDetails() {
    const initialAddressState = {
        name: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        phone: ""
    }

    const [shippingAddress, setShippingAddress] = useState({ ...initialAddressState })
    const [billingAddress, setBillingAddress] = useState({ ...initialAddressState })

    const handleShipping = (e) => {
        const {name, value}= e.target
        setShippingAddress({...shippingAddress,
        [name]: value
    })

    }

    const handleBilling = (e) => {
        const {name, value}= e.target
        setBillingAddress({...billingAddress,
        [name]: value
    })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        

    }


    return (
        <div>

            <form onSubmit={handleSubmit}>
                <Card sx={{ p: 2, display: "flex", flexDirection: "column", m: 1, width: { md: "40%", xs: "100%" } }}>
                    <h2>shipping Details</h2>
                    <TextField sx={{ my: 1 }} id="outlined-basic" label="name" variant="outlined"
                        value={shippingAddress.name} name="name" onChange={(e) => handleShipping(e)} required />

                    <TextField sx={{ my: 1 }} id="outlined-basic" label="line1" variant="outlined"
                        value={shippingAddress.line1} name="line1" onChange={e => handleShipping(e)} required />

                    <TextField sx={{ my: 1 }} id="outlined-basic" label="line2" variant="outlined"
                        value={shippingAddress.line2} name="line2" onChange={e => handleShipping(e)} />

                    <TextField sx={{ my: 1 }} id="outlined-basic" label="city" variant="outlined"
                        value={shippingAddress.city} name="city" onChange={e => handleShipping(e)} required />

                    <TextField sx={{ my: 1 }} id="outlined-basic" label="state" variant="outlined"
                        value={shippingAddress.state} name="state" onChange={e => handleShipping(e)} required />

                    <TextField sx={{ my: 1 }} id="outlined-basic" label="postal_code" variant="outlined"
                        value={shippingAddress.postal_code} name="postal_code" onChange={e => handleShipping(e)} required />

                    <TextField sx={{ my: 1 }} id="outlined-basic" label="country" variant="outlined"
                        value={shippingAddress.country} name="country" onChange={e => handleShipping(e)} required />
                    <CountryDropdown valueType='short' value={shippingAddress.country} onChange={val => handleShipping({
                        target: {
                            name: "country",
                            value: val
                        }
                    })} />

                    <TextField sx={{ my: 1 }} id="outlined-basic" label="phone" variant="outlined"
                        value={shippingAddress.phone} name="phone" onChange={e => handleShipping(e)} required />
                </Card>

                <Card sx={{ p: 2, display: "flex", flexDirection: "column", m: 1, width: { md: "40%", xs: "100%" } }}>
                    <h2>billing Details</h2>
                    <TextField sx={{ my: 1 }} id="outlined-basic" label="name" variant="outlined"
                        value={billingAddress.name} name="name" onChange={e => handleBilling(e)} required />

                    <TextField sx={{ my: 1 }} id="outlined-basic" label="line1" variant="outlined"
                        value={billingAddress.line1} name="line1" onChange={e => handleBilling(e)} required />

                    <TextField sx={{ my: 1 }} id="outlined-basic" label="line2" variant="outlined"
                        value={billingAddress.line2} name="line2" onChange={e => handleBilling(e)} />

                    <TextField sx={{ my: 1 }} id="outlined-basic" label="city" variant="outlined"
                        value={billingAddress.city} name="city" onChange={e => handleBilling(e)} required />

                    <TextField sx={{ my: 1 }} id="outlined-basic" label="state" variant="outlined"
                        value={billingAddress.state} name="state" onChange={e => handleBilling(e)} required />

                    <TextField sx={{ my: 1 }} id="outlined-basic" label="postal_code" variant="outlined"
                        value={billingAddress.postal_code} name="postal_code" onChange={e => handleBilling(e)} required />

                    <TextField sx={{ my: 1 }} id="outlined-basic" label="country" variant="outlined"
                        value={billingAddress.country} name="country" onChange={e => handleBilling(e)} required />
                    <CountryDropdown valueType='short' value={billingAddress.country} onChange={val => handleBilling({
                        target: {
                            name: "country",
                            value: val
                        }
                    })} />

                    <TextField sx={{ my: 1 }} id="outlined-basic" label="phone" variant="outlined"
                        value={billingAddress.phone} name="phone" onChange={e => handleBilling(e)} required />
                </Card>

                <Button type='submit'>Proceed to Checkout </Button>



            </form>
        </div>
    )
}

export default CheckoutDetails
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import Products from '../../components/products/Products';
import Slider from '../../components/slider/Slider';
function Home({direction}) {
  const { t } = useTranslation()
  //scrolling to a spesific section:
  const url =window.location.href;
  //852 slider
  const scrollToProducts=()=>{
    if(url.includes('#products')){
      window.scrollTo({
        top: 852,
        behavior:"smooth"
      })
    }
    return

  }

  useEffect(()=>{
    scrollToProducts()
  },[])
  return (
    <div>
      {/* {t("students")} */}
      <Slider direction={direction}/>
      <Products/>
    </div>
  )
}

export default Home
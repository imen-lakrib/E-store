import React from 'react'
import { useTranslation } from 'react-i18next';
import Products from '../../components/products/Products';
import Slider from '../../components/slider/Slider';
function Home() {
  const { t } = useTranslation()
  return (
    <div>
      {/* {t("students")} */}
      {/* <Slider/> */}
      <Products/>
    </div>
  )
}

export default Home
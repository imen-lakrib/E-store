import React from 'react'
import { Slider } from '../../components/slider/Slider'
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation()
  return (
    <div>
      {t("students")}
      {/* <Slider/> */}
    </div>
  )
}

export default Home
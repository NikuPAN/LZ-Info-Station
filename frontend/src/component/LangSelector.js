import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
 
const LangSelector = (props) => {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState('zh');
 
  const changeLanguage = (event) => {
    setSelectedLang(event.target.value);
    i18n.changeLanguage(event.target.value);
    props.onChange(event);
  }
 
  return (
    <div onChange={changeLanguage}>
      <h6 style={{ textAlign: "right" }}>
        <label htmlFor="zhLang">
          <input id="zhLang" type="radio" value="zh" name="language" defaultChecked={selectedLang === 'zh'} /> 正體中文
        </label>
        &nbsp;&nbsp;
        <label htmlFor="jpLang">
          <input id="jpLang" type="radio" value="jp" name="language" defaultChecked={selectedLang === 'jp'} /> 日本語
        </label>
        &nbsp;&nbsp;
        <label htmlFor="enLang">
          <input id="enLang" type="radio" value="en" name="language" defaultChecked={selectedLang === 'en'} /> English
        </label>
      </h6>
    </div>
  )
}
 
export default LangSelector;
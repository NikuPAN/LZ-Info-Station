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
        <label className="mr10">
          <input type="radio" value="zh" name="language" checked={selectedLang === 'zh'} /> 正體中文
        </label>
        &nbsp;&nbsp;
        <label>
          <input type="radio" value="jp" name="language" checked={selectedLang === 'jp'} /> 日本語
        </label>
        &nbsp;&nbsp;
        <label>
          <input type="radio" value="en" name="language" checked={selectedLang === 'en'} /> English
        </label>
      </h6>
    </div>
  )
}
 
export default LangSelector;
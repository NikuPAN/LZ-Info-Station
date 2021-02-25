import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next';

const DarkModeBtn = props => {

  const onChangeDarkMode = (e) => {
    props.onChange(e);
  }
  // Translation
	const { t } = useTranslation();


  return (
    <div>
      <FormControlLabel
				control={
					<Switch
						checked={props.checked}
						onChange={onChangeDarkMode}
						name="dark_mode" 
						color="primary"
					/>
				}
				label={t('DARK_MODE')}
			/>
    </div>
  )
}

DarkModeBtn.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default DarkModeBtn

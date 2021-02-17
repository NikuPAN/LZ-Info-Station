import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types'

const DarkModeBtn = props => {

  const onChangeDarkMode = (e) => {
    props.onChange(e);
  }

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
				label="ダークモード"
			/>
    </div>
  )
}

DarkModeBtn.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default DarkModeBtn

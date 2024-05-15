import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Themes } from '../Shared.consts';

const RedirectMenu: React.FC<{
  label: string;
  listItems: string[];
  isLoading?: boolean;
  isLink?: boolean;
}> = ({ label, listItems, isLoading, isLink }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        onClick={handleClick}
        endIcon={
          <KeyboardArrowDownOutlined
            color={'primary'}
            sx={{ opacity: isLoading ? 0.2 : 1 }}
          />
        }
        disabled={isLoading}
      >
        {label}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ maxHeight: '25rem' }}
      >
        {listItems.map((item) =>
          isLink ? (
            <Link key={item} to={item} style={{ color: Themes.medium_primary }}>
              <MenuItem value={item}>{item}</MenuItem>
            </Link>
          ) : (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ),
        )}
      </Menu>
    </div>
  );
};

export default RedirectMenu;

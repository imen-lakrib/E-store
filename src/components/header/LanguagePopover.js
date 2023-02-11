import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';
import i18n from '../../utils/language/i18n';

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'English',
    value: 'en',
    icon: '/assets/flags/en.png',
    dir:"ltr"
  },
  {
    label: 'French',
    value: 'fr',
    icon: '/assets/flags/fr.png',
    dir:"ltr"
  },
  {
    label: 'العربية',
    value: 'ar',
    icon: '/assets/flags/ar.png',
    dir:"rtl"
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover({local, setDirection}) {
  
  const [selectedLanguage,setSelectedLanguage]=useState(LANGS[0])
  function changeLocale(l) {
    if (local !== l) {
      i18n.changeLanguage(l)
    }

  }

  const [open, setOpen] = useState(null);


  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && { bgcolor: 'action.selected' }),
        }}
      >
        <Box component="img" sx={{ width: 28, height: 20 }} src={selectedLanguage.icon ? selectedLanguage.icon : LANGS[0].icon} />
      </IconButton> 



      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem key={option.value} selected={option.value === LANGS[0].value} onClick={() => {
              changeLocale(option.value)
              console.log(option.label)
              setSelectedLanguage(option)
              setDirection(option.dir)
              handleClose()
            }}>
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, height: 20, mr: 2 }} />
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
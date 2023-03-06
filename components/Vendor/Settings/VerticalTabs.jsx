import {
  Engineering,
  FormatShapes,
  LockPerson,
  ManageAccounts,
} from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import * as React from 'react';
import { theme as CustomTheme } from '../../../pages/_app';
import UpdateProfile from './UpdateProfile';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
}

const tabStyles = {
  pt: 1,
  pb: 1.5,
  px: 2,
  display: 'flex',
  flexDirection: 'row',
  width: '100% !important',
  maxWidth: '100%',
  textAlign: 'left',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: 1,
  transition: '0.3s ease-in',
  mb: 2,
};

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row', md: 'row' },
        borderRadius: 2,
        p: 2,
      }}
    >
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label='vendor settings tab'
        sx={{
          borderRight: 1,
          borderColor: { xs: 'transparent', sm: 'divider' },
          alignItems: 'flex-start',

          '& .MuiTabs-scroller': {
            width: '100%',
          },
        }}
      >
        <Tab
          label={
            <>
              <ManageAccounts />
              <Typography mt={0.5} textTransform='capitalize'>
                Profile
              </Typography>
            </>
          }
          {...a11yProps(0)}
          sx={{
            ...tabStyles,
            bgcolor:
              value === 0 ? CustomTheme.palette.secondary.light : 'transparent',
          }}
        >
          <ManageAccounts />
        </Tab>
        <Tab
          label={
            <>
              <FormatShapes />
              <Typography mt={0.5} textTransform='capitalize'>
                Appearance
              </Typography>
            </>
          }
          {...a11yProps(1)}
          sx={{
            ...tabStyles,
            bgcolor:
              value === 1 ? CustomTheme.palette.secondary.light : 'transparent',
          }}
        />
        <Tab
          label={
            <>
              <Engineering />
              <Typography mt={0.5} textTransform='capitalize'>
                Actions
              </Typography>
            </>
          }
          {...a11yProps(2)}
          sx={{
            ...tabStyles,
            bgcolor:
              value === 2 ? CustomTheme.palette.secondary.light : 'transparent',
          }}
        />
        <Tab
          label={
            <>
              <LockPerson />
              <Typography mt={0.5} textTransform='capitalize'>
                Security
              </Typography>
            </>
          }
          {...a11yProps(3)}
          sx={{
            ...tabStyles,
            mb: 2,
            bgcolor:
              value === 3 ? CustomTheme.palette.secondary.light : 'transparent',
          }}
        />
      </Tabs>

      <Divider />
      <TabPanel
        value={value}
        index={0}
        style={{ width: '100%', maxWidth: 400 }}
      >
        <Typography fontSize={18} fontWeight={700} mb={4} component='span'>
          Update Profile
        </Typography>
        <UpdateProfile />
      </TabPanel>
      <TabPanel
        value={value}
        index={1}
        style={{ width: '100%', maxWidth: 400 }}
      >
        <Typography fontSize={18} fontWeight={700} mb={4} component='span'>
          Apperance & Layout
        </Typography>
      </TabPanel>
      <TabPanel
        value={value}
        index={2}
        style={{ width: '100%', maxWidth: 400 }}
      >
        <Typography fontSize={18} fontWeight={700} mb={4} component='span'>
          Admin Actions
        </Typography>
      </TabPanel>
      <TabPanel
        value={value}
        index={3}
        style={{ width: '100%', maxWidth: 400 }}
      >
        <Typography fontSize={18} fontWeight={700} mb={4} component='span'>
          Security Settings
        </Typography>
      </TabPanel>
    </Box>
  );
}

import { Divider, Grid, List, ListItem, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
const FooterClient = () => {
  return (
    <div className="container">
      <Divider />
      <footer className="footer " style={{ marginTop: 50 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Typography fontWeight="bold" variant="h6">
              Caroutes
            </Typography>
            <List>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Graphics &amp; Design
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Digital Marketing
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Writing &amp; Translation
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Video &amp; Animation
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Music &amp; Audio
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Programming &amp; Tech
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Data
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Business
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Lifestyle
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Sitemap
                  </Typography>
                </Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography fontWeight="bold" variant="h6">
              About
            </Typography>
            <List>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#" rel="">
                    Careers
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#" rel="">
                    Press &amp; News
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#" rel="">
                    Partnerships
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#" rel="">
                    Privacy Policy
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#" rel="">
                    Terms of Service
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#" rel="">
                    Intellectual Property Claims
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Investor Relations
                  </Typography>
                </Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography fontWeight="bold" variant="h6">
              Support
            </Typography>
            <List>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Help &amp; Support
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Trust &amp; Safety
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Selling on Fiverr
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Buying on Fiverr
                  </Typography>
                </Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography fontWeight="bold" variant="h6">
              Communlty
            </Typography>
            <List>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Events
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Blog
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Forum
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Community Standards
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Podcast
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Affiliates
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Invite a Friend
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Become a Seller
                  </Typography>
                </Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography fontWeight="bold" variant="h6">
              More From Fiverr
            </Typography>
            <List>
              <ListItem className="footer-link" sx={{ p: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Fiverr Business
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Fiverr Pro
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Fiverr Studios
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Fiverr Logo Maker
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Fiverr Guides
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Get Inspired
                  </Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Fiverr Select
                  </Typography>
                </Link>
              </ListItem>
              <ListItem
                className="footer-link"
                sx={{ px: 0, display: 'block' }}
              >
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    ClearVoice
                  </Typography>
                  <Typography variant="caption">Content Marketing</Typography>
                </Link>
              </ListItem>
              <ListItem
                className="footer-link"
                sx={{ px: 0, display: 'block' }}
              >
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Fiverr Workspace
                  </Typography>
                  <Typography variant="caption">Invoice Software</Typography>
                </Link>
              </ListItem>
              <ListItem
                className="footer-link"
                sx={{ px: 0, display: 'block' }}
              >
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Learn
                  </Typography>
                  <Typography variant="caption">Online Courses</Typography>
                </Link>
              </ListItem>
              <ListItem className="footer-link" sx={{ px: 0 }}>
                <Link to="/">
                  <Typography variant="subtitle1" href="#">
                    Working Not Working
                  </Typography>
                </Link>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </footer>
    </div>
  );
};

export default FooterClient;

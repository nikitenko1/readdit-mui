import { useDispatch, useSelector } from 'react-redux';
import { ALERT } from '../../redux/types/alertType';
import { toggleSubscribe } from '../../redux/actions/subAction';
import { Link as RouterLink } from 'react-router-dom';
import { Paper, Typography, useMediaQuery, Link, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { useTheme } from '@mui/material/styles';
import SubDialog from '../subs';
import LoadingSpinner from '../loadingSpinner';
import { useStyles } from './styles';

const TopSubsPanel = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { subs, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  // extra-small to screen sizes from 0 up to and including "xs" //  breakpoints: xs: 0, sm: 600,
  const isNotDesktop = useMediaQuery(theme.breakpoints.down('md'));

  if (isNotDesktop) {
    return null;
  }

  const loggedUser = JSON.parse(localStorage.getItem('logged')) || auth;

  const loadingSubs = !subs || !subs.topSubs;
  // \server\controllers\subreddit.js
  // const newSubreddit = new Subreddit({ ... subscribedBy: [admin._id] ... });

  const isSubscribed = (subscribedBy, user) => {
    return subscribedBy.includes(user.id);
  };

  const handleJoinSub = (id, subscribedBy, subredditName) => {
    try {
      if (!auth.token) return;

      let updatedSubscribedBy;
      if (subscribedBy.includes(auth.id)) {
        updatedSubscribedBy = subscribedBy.filter((s) => s !== auth.id);
      } else {
        updatedSubscribedBy = [...subscribedBy, auth.id];
      }
      dispatch(toggleSubscribe(id, updatedSubscribedBy, auth.token));
      let message = subscribedBy.includes(auth.id)
        ? `Unsubscribed from r/${subredditName}`
        : `Subscribed to r/${subredditName}!`;
      dispatch({
        type: ALERT,
        payload: {
          success: message,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Paper variant="outlined" className={classes.mainPaper}>
      <Paper variant="outlined" className={classes.listPaper}>
        <Typography variant="h5" color="secondary" className={classes.title}>
          Top Subreaddits
        </Typography>
        {loadingSubs ? (
          <LoadingSpinner text="Fetching subs data..." />
        ) : (
          subs.topSubs.map((s, i) => (
            <div key={s.id} className={classes.listWrapper}>
              <Typography variant="body2" className={classes.listItem}>
                {`${i + 1}. `}
                <Link
                  component={RouterLink}
                  to={`/r/${s.subredditName}`}
                  color="primary"
                >
                  r/{s.subredditName}
                </Link>
                {` - ${s.subscriberCount} members `}
              </Typography>
              {loggedUser && (
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={
                    isSubscribed(s.subscribedBy, auth) ? (
                      <CheckIcon />
                    ) : (
                      <AddIcon />
                    )
                  }
                  onClick={() =>
                    handleJoinSub(s.id, s.subscribedBy, s.subredditName)
                  }
                >
                  {isSubscribed(s.subscribedBy, auth) ? 'Joined' : 'Join'}
                </Button>
              )}
            </div>
          ))
        )}
      </Paper>
      {loggedUser && <SubDialog />}
    </Paper>
  );
};

export default TopSubsPanel;

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// data = [
//     {
//       "user": {
//         "name": "Newton",
//         "avatars": {
//           "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//           "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//           "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//         },
//         "handle": "@SirIsaac"
//       },
//       "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//       },
//       "created_at": 1461116232227
//     },
//     {
//       "user": {
//         "name": "Descartes",
//         "avatars": {
//           "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//           "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//           "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//         },
//         "handle": "@rd" },
//       "content": {
//         "text": "Je pense , donc je suis"
//       },
//       "created_at": 1461113959088
//     },
//     {
//       "user": {
//         "name": "Johann von Goethe",
//         "avatars": {
//           "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//           "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//           "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//         },
//         "handle": "@johann49"
//       },
//       "content": {
//         "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//       },
//       "created_at": 1461113796368
//     }
//   ]

// Helper function for input safety
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// Helper function for calculating creat time elasped for each tweet
function timeElapsed(createTime) {
  let now = new Date();
  let rightNow = now.getTime();
  let past = createTime;
  let diff = rightNow - past;
  let sec = diff / 1000;
  if (sec < 60) {
    return 'Less than 1 min ago';
  } else if (sec >= 60 && sec < 3600) {
    return Math.floor(sec / 60) + 'minutes ago';
  } else if (sec >= 3600 && sec <86400) {
    return Math.floor(sec / 3600) + 'hours ago';
  } else if (sec >= 86400 && sec < 2592000) {
    return Math.floor(sec / 86400) + 'days ago';   
  } else if (sec >= 2592000 && sec < 31104000) {
    return Math.floor(sec / 2592000) + 'months ago' 
  } else {
    return 'More than 1 year ago';
  }
}

function createTweetElement(tweet) {
    let $tweet = $(`<article class="tweets-comingup">
    <header class="title">
      <img src="${tweet.user.avatars.small}">
      <h3>${escape(tweet.user.name)}</h3>
      <p>${escape(tweet.user.handle)}</p>
    </header>

    <section class="tweet-of">
      <p>${escape(tweet.content.text)}</p>
    </section>

    <footer class="time">
      <p>${timeElapsed(tweet.created_at)}</p>
      <div class="icons">
        <a href="#"><span class="glyphicon glyphicon-flag"></span></a>
        <a href="#"><span class="glyphicon glyphicon-retweet"></span></a>
        <a href="#"><span class="glyphicon glyphicon-heart"></span></a>
      </div>
    </footer>
  </article>`);
  return $tweet;
}

function renderTweets(tweets) {
  for (tweet of tweets) {
    $('#tweet-container').append(createTweetElement(tweet));
  }
}

$(document).ready(() => {
  loadTweets();
  
  $('.compose').on('click', () => {
    $('.new-tweet').slideToggle(300);
    $('#input-tweet :input:enabled:visible:first').focus();
  });

  $('#input-tweet').on(('submit'), function(event) {
      event.preventDefault();
      let queryString = $(this).serialize();
      let text = $(this).find("textarea").val()
      console.log(queryString);
      if (text.length === 0) {
        $('#zeroInput').slideDown(300);
        $('#overMax').hide();
      } else if (text.length > 140) {
        $('#overMax').slideDown(300);
        $('#zeroInput').hide();
      } else {
        $('#zeroInput').slideUp(100);
        $('#overMax').slideUp(100);
    $.ajax('/tweets', {
          method: 'POST',
          dataType: 'json',
          data: queryString,
          error: function(req, status, error) {
              console.log('nooooo!')
            },
        success: function(res, statusCode) {
            $('#tweet-container').prepend(createTweetElement(res));
            $('#textInput').val('');
        }
    
    })
}
  });

  function loadTweets() {
    $.ajax('/tweets', {
      method: 'GET',
      dataType: 'json',
      error: function(req, status, error) {
        console.log('nooooo!')
      },
      success: function(res, statusCode) {
        res.sort(function(a, b) {
          return b.created_at - a.created_at;
        });
        renderTweets(res);
        console.log('Yeah!!');
      }
    })
  }
});

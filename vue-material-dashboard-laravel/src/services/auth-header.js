export default function authHeader() {
    // let user = JSON.parse(localStorage.getItem('user_free'));
    // if (user) {
    //   return { Authorization: 'Bearer ' + user, 
    //             'Accept' : 'application/vnd.api+json',
    //           'Content-Type': 'application/vnd.api+json'};
    // } else {
    //   return {};
    // }
    let token = localStorage.getItem('token')

    if (token) {
      return { Authorization: 'Bearer ' + token, 
                'Accept' : 'application/vnd.api+json',
              'Content-Type': 'application/vnd.api+json'};
    } else {
      return {};
    }
  }
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function generateCodeVerifier() {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return btoa(String.fromCharCode.apply(null, array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64URLEncode(str) {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return base64URLEncode(btoa(String.fromCharCode.apply(null, new Uint8Array(digest))));
}

export default function AuthAzure() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function authenticate() {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const authUrl = 'https://login.microsoftonline.com/966141de-bf34-4797-a829-9f5c0c0cfbcc/oauth2/v2.0/authorize';
    const params = {
      client_id: '0a26d1f9-bc89-4345-b9c5-33941ff7213c',
      response_type: 'code',
      redirect_uri: 'http://localhost:3000/auth',  //  Redirect to URI registered in Azure AD 
      response_mode: 'query',
      scope: 'User.Read'
      //state: '12345'
      //code_challenge: codeChallenge,
      //code_challenge_method: 'S256'
    };

    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${authUrl}?${queryString}`;

    // Store de code_verifier locally
    localStorage.setItem('code_verifier', codeVerifier);

    // Shows values in the console before redirect 
    console.log('codeVerifier:', codeVerifier);
    console.log('codeChallenge:', codeChallenge);
    console.log('authUrl:', fullUrl);

    // Redirect the user to authentication page
    window.location.href = fullUrl;
  }

  useEffect(() => {
    // catch the authorization code if os already redirect 
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');
    console.log('code received:', code);

    if (code) {
      //Send the code to the other URL
      axios.get('https://it-tools-local.3pillarglobal.com:5556/login/callback', { params: {
        code: code
      } })
        .then(response => {
          console.log('URL target response:', response.data);
          // Handle the answer, I do not know how to proceed with the answer
          setIsAuthenticated(true);
        })
        .catch(error => {
          console.error('Code sent to the target failed: ', error);
        });
    }
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <p>Autenticado con éxito</p>
      ) : (
        <button onClick={authenticate}>Login</button>
      )}
    </div>
  );
}


/////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function generateCodeVerifier() {
//   const array = new Uint8Array(32);
//   window.crypto.getRandomValues(array);
//   return btoa(String.fromCharCode.apply(null, array))
//     .replace(/\+/g, '-')
//     .replace(/\//g, '_')
//     .replace(/=+$/, '');
// }

// function base64URLEncode(str) {
//   return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
// }

// async function generateCodeChallenge(codeVerifier) {
//   const encoder = new TextEncoder();
//   const data = encoder.encode(codeVerifier);
//   const digest = await window.crypto.subtle.digest('SHA-256', data);
//   return base64URLEncode(btoa(String.fromCharCode.apply(null, new Uint8Array(digest))));
// }

// export default function AuthAzure() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   async function authenticate() {
//     const codeVerifier = generateCodeVerifier();
//     const codeChallenge = await generateCodeChallenge(codeVerifier);

//     const authUrl = 'https://login.microsoftonline.com/22fc7c99-f247-4ce4-beb1-e06b8297b98f/oauth2/v2.0/authorize';
//     const params = {
//       client_id: '0908ac03-3eef-4ddc-ba03-4519e19d2adc',
//       response_type: 'code',
//       redirect_uri: 'http://localhost:3000/OnePage',
//       response_mode: 'query',
//       scope: 'User.Read',
//       state: '12345',
//       code_challenge: codeChallenge,
//       code_challenge_method: 'S256'
//     };

//     const queryString = new URLSearchParams(params).toString();
//     const fullUrl = `${authUrl}?${queryString}`;

//     // Store the code_verifier locally
//     localStorage.setItem('code_verifier', codeVerifier);

//     // Redirect the user to authentication page
//     window.location.href = fullUrl;
//   }

//   useEffect(() => {
//     const query = new URLSearchParams(window.location.search);
//     const code = query.get('code');
//     const codeVerifier = localStorage.getItem('code_verifier');
    
//     if (code && codeVerifier) {
//       // Send the code and code_verifier to the backend
//       axios.post('http://localhost:3000/OnePage', { code }, {
//         headers: { 'code_verifier': codeVerifier }
//       })
//       .then(response => {
//         console.log('Token response:', response.data);
//         setIsAuthenticated(true);
//       })
//       .catch(error => {
//         console.error('Error exchanging code for token:', error);
//       });
//     }
//   }, []);

//   return (
//     <div>
//       {isAuthenticated ? (
//         <p>Authenticated successfully</p>
//       ) : (
//         <button onClick={authenticate}>Login</button>
//       )}
//     </div>
//   );
// }

///////////////////////////////////////////////////////////


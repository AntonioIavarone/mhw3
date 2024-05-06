function authorizeWithSquare() {
    const clientId = 'sandbox-sq0idb-Qpf_dDHdwj_oG4W2OZqPIg';
    const redirectUri = 'http://localhost:8080/mhw3/mhw3_SurfacePro10.html';
    const scope= 'PAYMENTS_WRITE';

    const authUrl = `https://connect.squareupsandbox.com/oauth2/authorize?client_id=${clientId}&scope=${scope}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`;

    // Reindirizza l'utente alla pagina di autorizzazione Square(solo la prima volta)
    window.location.href = authUrl;
}

document.getElementById('authorizeButton').addEventListener('click', authorizeWithSquare);

window.addEventListener('load', function() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (params.has('code')) {
        miaFunzioneDopoIlCaricamento();
    }
});

function miaFunzioneDopoIlCaricamento() {
    // Codice della tua funzione da eseguire dopo il caricamento completo della pagina
    console.log('La pagina è stata caricata completamente!');
}

function processPaymentWithSquare(code) {
            const clientId = 'INSERIRE ID (SANDBOX)';
            const clientSecret = 'INSERIRE SECRET (SANDBOX)';
            const redirectUri = 'http://localhost:8080/mhw3/mhw3_SurfacePro10.html'; // Specifica l'URL di reindirizzamento (uguale all'URL della pagina stessa)

            // Configura la richiesta per ottenere l'access_token utilizzando il code
            const tokenRequestUrl = 'https://connect.squareupsandbox.com/oauth2/token';
            const tokenRequestBody = `client_id=${clientId}` +
                             `&client_secret=${clientSecret}` +
                             `&code=${code}` +
                             `&grant_type=authorization_code` +
                             `&scope=PAYMENTS_WRITE` +
                             `&redirect_uri=${encodeURIComponent(redirectUri)}`;

            // Effettua la richiesta POST per ottenere l'access_token
            fetch(tokenRequestUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: tokenRequestBody
            })

            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore durante lo scambio del code con l\'access_token.');
                }
                return response.json();
            })

            .then(data => {
                const accessToken = data.access_token;
                console.log('Access Token ottenuto:', accessToken);

                // Processo il pagamento con l'access token
                const paymentRequestUrl = 'https://connect.squareupsandbox.com/v2/payments';
                const paymentRequestBody = {
                    source_id: 'cnon:card-nonce-ok', // ID del metodo di pagamento
                    amount_money: {
                        amount: 142900, // Importo in centesimi (100 = $1.00)
                        currency: 'USD'
                    },
                    idempotency_key: idempotencyKey, // Chiave di idempotenza per evitare pagamenti duplicati
                    
                    autocomplete: true
                };
                // Effettua la richiesta POST per processare il pagamento
                return fetch(paymentRequestUrl, {
                    method: 'POST',
                    
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(paymentRequestBody),
                });
            })

            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore durante il processamento del pagamento.');
                    
                }
                return response.json();
            })
            .then(data => {
                console.log('Pagamento completato con successo:', data);
            })
            .catch(error => {
                console.error('Errore durante il pagamento:', error);
            });
            }

        // Chiamata alla funzione handleAuthorizationCallback() dopo il reindirizzamento dalla pagina di autenticazione di SquareS
        window.onload = function() {
            handleAuthorizationCallback();
        };

        function handleAuthorizationCallback() {
                const urlParams = new URLSearchParams(window.location.search);
                const code = urlParams.get("code");
                if (code) {
                    console.log('Code OAuth2 ottenuto:', code);
                    // Ora si può procedere al pagamento
                    processPaymentWithSquare(code);

                } else {
                    console.error('Nessun code presente nell\'URL.');
                }
            }
// Generazione della chiave di idempotenza
    function generateIdempotencyKey() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 32;
        let idempotencyKey = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        idempotencyKey += characters.charAt(randomIndex);
    }
    return idempotencyKey;
}

//Eseguo la funzione per generare una chiave di idempotenza e mostrarla nel log, sarà usata successivamente nel processo di pagamento
const idempotencyKey = generateIdempotencyKey();
console.log('Chiave di idempotenza generata:', idempotencyKey);
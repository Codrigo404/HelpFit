 <script>
        const firebaseConfig = {
            apiKey: "AIzaSyBDvHrkCyIWirWDorgTxGWyycWecqEnZT4",
            authDomain: "database-biocode.firebaseapp.com",
            projectId: "database-biocode",
            storageBucket: "database-biocode.firebasestorage.app",
            messagingSenderId: "153606225851",
            appId: "1:153606225851:web:f4700f168f70d0e8914e9e"
        };
        if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
        if (typeof db === 'undefined') { var db = firebase.firestore(); }
    </script>
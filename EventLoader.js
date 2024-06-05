var Details = JSON.parse(localStorage.getItem('Account'));

function EventLoader() {
    document.getElementById('User').innerHTML = Details.Name;
    document.getElementById('Contact').innerHTML = Details.ContactNo;
    fetch('/EventLoader', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({Details})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let Host = ['Spandan','Transmission','Sparx'];
        let cursor = [];
        for (i=0;i<Host.length;i++) {
            for (j=0;j<data.Host.length;j++) {
                if (Host[i] == data.Host[j]) {
                    cursor.push(data.EventName[j]);
                }
            }
            console.log(cursor);
            sessionStorage.setItem(Host[i],JSON.stringify(cursor));
            cursor.length = 0;
        }
    })
}

window.onload = EventLoader;

var Details = JSON.parse(localStorage.getItem('Account'));

function UserDetails() {
    window.scrollTo(0, 0);
    document.getElementById('User').innerHTML = Details.Name;
    document.getElementById('Contact').innerHTML = Details.ContactNo;

    // if (document.getElementById('Spandan') != null) {
    //     let Spandan = JSON.parse(sessionStorage.getItem('Spandan'));
    //     console.log(Spandan);
    //     let EventName = ['E1','E2','E3','E4','E5'];
    //     for (i=0;i<Spandan.length;i++) {
    //         for (j=0;j<EventName.length;j++) {
    //             if (document.getElementById(EventName[j]) != null && document.getElementById(EventName[j]).innerHTML == Spandan[i]) {
    //                 document.getElementById(i+1).innerHTML = 'Registered'
    //             }
    //         }
    //     }
    // }
}

window.onload = UserDetails;



//register Btn + Unregister Btn Function
function Eventbtn(Btnid,Host) {
    let EventName =  document.getElementById('E'+Btnid).innerHTML;
    fetch('/EventRegister', {
        method: 'POST',
        headers:  {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Details,EventName,Host})
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })

}
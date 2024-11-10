document.addEventListener('DOMContentLoaded', function () {
    const submitLogin = document.querySelector(".submit-login");
    const submitRegister = document.querySelector(".submit-register");

    let id =""; 

    submitLogin.addEventListener("click", async () => {
        const passwordField = document.querySelector('[name="psw"]');
        const usernameField = document.querySelector('[name="uname"]');

    
        event.preventDefault(); // Stop form submission
        // Check if the password length is less than the minimum
        if (usernameField.value.length < 5) {
            // Prevent form submission
            alert("Username must be at least 5 characters long.");
            event.preventDefault(); // Stop form submission
            return;  // Make sure form doesn't submit
            }

        if (passwordField.value.length < 8) {
        // Prevent form submission
        alert("Password must be at least 8 characters long.");
        event.preventDefault(); // Stop form submission
        return;  // Make sure form doesn't submit
        }
        
        const username = usernameField.value;
        const password = passwordField.value;
        id = username;
        id += "_".repeat(Math.max(500-username.length, 0));
        
        const param = new URLSearchParams();
        param.append("username", username);
        param.append("password", password);
        param.append("token", id)

        const fetched = await fetch("https://backend.ichenglin.net/email_tracking/user/login", {
            method: "POST",
            body: param
        }).then(result => result.json());

        if (fetched.success == false) {
            alert(fetched.reason);
            event.preventDefault();
            return;
        }

        document.getElementById("gated-content").classList.remove("hidden");
        document.getElementById("ungated-content").classList.add("hidden");
    });

    submitRegister.addEventListener("click", async () => {
        const passwordField = document.querySelector('[name="psw"]');
        const usernameField = document.querySelector('[name="uname"]');

    
        event.preventDefault(); // Stop form submission
        // Check if the password length is less than the minimum
        if (usernameField.value.length < 5) {
            // Prevent form submission
            alert("Username must be at least 5 characters long.");
            event.preventDefault(); // Stop form submission
            return;  // Make sure form doesn't submit
            }

        if (passwordField.value.length < 8) {
        // Prevent form submission
        alert("Password must be at least 8 characters long.");
        event.preventDefault(); // Stop form submission
        return;  // Make sure form doesn't submit
        }
        
        const username = usernameField.value;
        const password = passwordField.value;
        id = username;
        id += "_".repeat(Math.max(500-username.length, 0));
        
        const param = new URLSearchParams();
        param.append("username", username);
        param.append("password", password);
        param.append("token", id)

        const fetched = await fetch("https://backend.ichenglin.net/email_tracking/user/register", {
            method: "POST",
            body: param
        }).then(result => result.json());

        if (fetched.success == false) {
            alert(fetched.reason);
            event.preventDefault();
            return;
        }

        document.getElementById("gated-content").classList.remove("hidden");
        document.getElementById("ungated-content").classList.add("hidden");
    });

    const submitGroup = document.querySelector(".submit-group");

    submitGroup.addEventListener("click", async () => {
        const groupField = document.querySelector('[name="group"]');
        event.preventDefault();
        const group = groupField.value;

        const param = new URLSearchParams();
        param.append("record_group", group);

        const fetched = await fetch("https://backend.ichenglin.net/email_tracking/email/create", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${id}`,
            },
            body: param
        }).then(result => result.json());

        if (fetched.success == false) {
            alert(fetched.reason);
            event.preventDefault();
            return;
        }
        else {
            alert(`https://backend.ichenglin.net/email_tracking/email/update?id=${fetched.id}`);
        }
    });

});

    
const makeid = (length) => {
    let result = '';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
paypal.Buttons({
    createOrder: function(data, actions) {
        console.log("Creating order...");
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: document.getElementById('checkout-total-price').textContent
                }
            }]
        }).then(function(orderId) {
            console.log("Order ID:", orderId);
            return orderId;
        }).catch(function(error) {
            console.error("Error creating order:", error);
        });
    },
    onApprove: function(data, actions) {
        console.log("Order approved:", data);
        return actions.order.capture().then(function(details) {
            document.getElementById('result-message').textContent = 'Transaction completed by ' + details.payer.name.given_name;
        }).catch(function(error) {
            console.error("Error capturing order:", error);
        });
    },
    onError: function(err) {
        console.error("PayPal error:", err);
        document.getElementById('result-message').textContent = 'An error occurred during the transaction.';
    }
}).render('#paypal-button-container');

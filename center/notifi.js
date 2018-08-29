sas
    .factory('Notifi', function () {
        return {
            _error: function (sms, from, align) {
                $.notify({
                    icon: "add_alert",
                    message: sms

                }, {
                        type: 'danger',
                        timer: 3000,
                        placement: {
                            from: from,
                            align: align
                        }
                    });
            },
            _success: function (sms, from, align) {
                $.notify({
                    icon: "add_alert",
                    message: sms

                }, {
                        type: 'success',
                        timer: 3000,
                        placement: {
                            from: from,
                            align: align
                        }
                    });
            }
        }
    });
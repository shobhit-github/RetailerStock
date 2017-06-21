"use strict";
/**
 * Storing multiple constant values inside of an object
 * Keep in mind the values in the object mean they can be modified
 * Which makes no sense for a constant, use wisely if you do this
 */

app.controller('chatCtrl', ['$scope', 'Pubnub', '$token', '$rootScope', '$api',
    function chatCtrl($scope, Pubnub, $token, $rootScope, $api) {

        $scope.channel = 'Channel-vg2otkim4';
        $scope.messages = [];



        $scope.getUsers = function () {

            $api.getChatList().then(
                function (res, status) {

                    $scope.chat_list	= res.data.response;
                },
                function (res, status) {

                    $api.handleError(res);
                }
            );

        };

        $scope.getUsers();


        $scope.selectUserToChat = function (user_id) {
            $scope.selected_user = user_id;
        };

        // Send the messages over PubNub Network
        $scope.sendMessage = function (event) {


            // Don't send an empty message
            if (!$scope.messageContent || $scope.messageContent === '') {
                return;
            }

            var content = { receiver_id: $scope.selected_user, firstname: $rootScope.user.firstname,  lastname: $rootScope.user.lastname, avatar: $rootScope.user.picture, chat_message: $scope.messageContent, chat_align: 'left' };

            Pubnub.publish({
                channel: $scope.channel,
                message: {
                    content: content,
                    date: new Date()
                },
                callback: function (m) {
                    $scope.$apply(function () {
                        $scope.messages.push(content)
                    });
                }
            });
            // Reset the messageContent input
            $scope.messageContent = '';

            event.preventDefault();


        };


        // Subscribing to the ‘messages-channel’ and trigering the message callback
        Pubnub.subscribe({
            channel: $scope.channel,
            triggerEvents: ['callback']
        });




        // Listening to the callbacks
        $scope.$on(Pubnub.getMessageEventNameFor($scope.channel), function (ngEvent, m) {

            if(m.content.receiver_id == $rootScope.user._id) {

                $scope.$apply(function () {
                    m.content.chat_align = 'right';
                    $scope.messages.push(m.content)
                });
            }

            return;

        });


    }]);
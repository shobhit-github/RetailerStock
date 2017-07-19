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
        $scope.chat_list = [];



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


        
        $scope.saveMessage = function (data) {
            
            data.chat_align = 'right';
            $scope.messages.push(data);


            $api.saveMessage({sender_id:data.sender_id, receiver_id:data.receiver_id, message: data.chat_message}).then(
                function (response, status) {

                },
                function (response, status) {

                }
            );

        };


        // Send the messages over PubNub Network
        $scope.typingMessage = function (event) {

            var content = { receiver_id: $scope.selected_user, firstname: $rootScope.user.firstname,  lastname: $rootScope.user.lastname };

            /*Pubnub.publish({
                channel: $scope.channel,
                message: {
                    event:'chat:typing',
                    content: content,
                    date: new Date()
                },
                callback: function (m) {
                   // console.log(m)
                }
            });*/

        };


        // Send the messages over PubNub Network
        $scope.sendMessage = function (event) {


            // Don't send an empty message
            if (!$scope.messageContent || $scope.messageContent === '') {
                return;
            }

            var content = { receiver_id: $scope.selected_user, sender_id: $rootScope.user._id, firstname: $rootScope.user.firstname,  lastname: $rootScope.user.lastname, avatar: $rootScope.user.picture, chat_message: $scope.messageContent, chat_align: 'left', date: new Date() };

            Pubnub.publish({
                channel: $scope.channel,
                message: {
                    event:'chat:send_message',
                    content: content
                }
            },function (m) {
                $scope.message_status = 'SENT';
                $scope.$apply(function () {
                    $scope.messages.push(content)
                });
            });


            // Reset the messageContent input
            $scope.messageContent = '';

            event.preventDefault();


        };



        // Listening to the callbacks
        $scope.$on(Pubnub.getMessageEventNameFor($scope.channel), function (ngEvent, m) {




            switch (m.event) {

                case 'chat:send_message':
                    $scope.$apply(function () {
                        if (m.content.receiver_id == $rootScope.user._id) {
                            $scope.saveMessage(m.content);
                        }
                    });
                    break;


                case 'chat:typing':
                    $scope.$apply(function () {
                        $scope.user_typing = m.content;
                    });
                    break;

                case 'user:login_status:true':
                    $scope.$apply(function () {
                        $scope.chat_list.push(m.content);
                    });
                    break;

            }

        });




    }]);
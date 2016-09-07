require 'test_helper'

class EnquiryMailerTest < ActionMailer::TestCase
  test "received" do
    mail = EnquiryMailer.received
    assert_equal "Received", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

  test "response" do
    mail = EnquiryMailer.response
    assert_equal "Response", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end

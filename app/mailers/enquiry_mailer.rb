class EnquiryMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.enquiry_mailer.received.subject
  #
  def received(enquiry)
    @greeting = "Hi"
    @enquiry = enquiry
    mail(to: "markham.jack.w@gmail.com", subject:"An enquiry has been received")
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.enquiry_mailer.response.subject
  #
  def response(enquiry)
    @greeting = "Hi"
    @enquiry = enquiry
    mail(to:@enquiry.email, subject:"Thankyou for your enquiry")
  end
end

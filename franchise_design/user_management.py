from codecs import ignore_errors
from datetime import timedelta
import frappe, json, datetime,requests,base64,binascii,random
import numpy as np
import pandas as pd
from frappe.model.document import Document
from frappe.desk.form.load import get_attachments
from mimetypes import guess_extension, guess_type
from frappe.utils import get_site_path
from frappe.utils.password import update_password


@frappe.whitelist(allow_guest = True)
def user_signup(**args):
    """
        User Creation
        Doctype: User and Parents
    """
    if isinstance(args['args'],str):
        parameters_dict = json.loads(args['args'])
    else:
        parameters_dict = args['args']
    # parameters_dict = parameters_dict['args']

    from datetime import datetime

    new_api_call = frappe.new_doc("API Response")
    new_api_call.title = "Create New User"
    new_api_call.data_r_s = str(parameters_dict)
    new_api_call.date_time = datetime.now()
    user = frappe.db.get("User", {"email": parameters_dict['email']})
    if frappe.db.exists("User",{"email": parameters_dict['email']}):
        response = {
            "status": "info",
            "message":"Email Already Exists ",
            "statuscode": 400,
        }
        return response   
    elif frappe.db.exists("User",{"phone": parameters_dict['home_phone_number']}):
        response = {
            "status": "info",
            "message":"Mobile Number Already Exists ",
            "statuscode": 400,
        }
        return response
    if user:
        if user.disabled:
            response = {
                "status": "info",
                "message":"Registered but disabled",
                "statuscode": 400,
            }
            return response
        else:
            response = {
                "status": "error",
                "message":"Already Registered",
                "statuscode": 400,
            }        
            return response 
    else :
        try:
            new_customer = frappe.new_doc("Parents")            
            new_customer.parent_name = str(parameters_dict['first_name']) +"_"+str(parameters_dict["last_name"])
            new_customer.phone = parameters_dict['home_phone_number']
            new_customer.mobile_number = parameters_dict['mobile_number']
            new_customer.work_phone_number = parameters_dict["work_phone_number"]
            new_customer.gender = parameters_dict['gender']
            new_customer.birth_date = parameters_dict['dob']
            new_customer.email = parameters_dict['email']
            new_customer.address_line_1 = parameters_dict["address_line_1"]
            new_customer.address_line_2 = parameters_dict["address_line_2"]
            new_customer.city = parameters_dict["city"]
            new_customer.county = parameters_dict["county"]
            new_customer.pincode = parameters_dict["postcode"]
            # new_customer.comment = parameters_dict["comment"]
            
            # age = datetime.strptime((parameters_dict['dob']), '%Y-%m-%d').date()
            new_customer.flags.ignore_permissions = True
            new_customer.insert()
            new_customer.save(ignore_permissions=True)
            new_user = frappe.new_doc("User")
            new_user.first_name = parameters_dict['first_name']
            new_user.username = parameters_dict['first_name']
            new_user.last_name = parameters_dict['last_name']
            # new_user.first_name = parameters_dict['customer_name']
            # new_user.username = parameters_dict['customer_name']            
            new_user.email = parameters_dict['email']
            new_user.enabled = 1
            new_user.password = parameters_dict['password']
            # new_user.send_welcome_email = 1
            # new_user.report_preference = parameters_dict['report_preference']            
            new_user.birth_date = parameters_dict['dob']
            new_user.phone = parameters_dict['home_phone_number']
            new_user.mobile_no = parameters_dict['mobile_number']
            new_user.gender = parameters_dict['gender']
            new_user.user_type = "Website User"
            # new_user.role_profile_name = "User Role"
            new_user.flags.ignore_permissions = True
            new_user.insert()
            new_user.save(ignore_permissions=True)
            u = frappe.get_doc('User', parameters_dict['email'])
            u.append('roles',{
                "doctype": "Has Role",
                "role":"Customer"
            })
            u.save(ignore_permissions=True)
            # # reset_password(parameters_dict["email"],send_email=True)
            # response = {
            #         "status": "success",
            #         "message":"Registration completed please check your email for verification",
            #         "statuscode": 200,
            # } 
            response = {
                    "status": 200,
                    "error":"false",
                    "message":"User created successfully.",
                    "data":{
                        "id":parameters_dict['email'],
                        "parent_id": new_customer.name,
                        "parent_name": new_customer.parent_name
                    }
            }
            update_password(parameters_dict['email'],parameters_dict['password'])
            new_api_call.url_response = str(parameters_dict)
            new_api_call.response = str("inserted")
            new_api_call.status = str(response["status"])
            new_api_call.data = str(parameters_dict)
            new_api_call.flags.ignore_permissions = True
            new_api_call.insert()
            new_api_call.save(ignore_permissions=True)
            frappe.db.commit()
            return response

            # reset_password(parameters_dict["email"],send_email=True)

        except Exception as e:
            response = {
                    "status": 400,
                    "error": "true",
                    "message": "Unable to created user at this moment,Please try again later.",
                    "data":{
                        "id":parameters_dict['email'],
                        "message_exception":e
                    }
                }
            new_api_call.status = str(response["status"])
            new_api_call.url_response = str(response)
            new_api_call.data = str(parameters_dict)
            new_api_call.response = str("not inserted")
            new_api_call.flags.ignore_permissions = True
            new_api_call.insert()
            new_api_call.save(ignore_permissions=True)
            return response

@frappe.whitelist(allow_guest = True)
def update_user_password(**args):
    """
        Update user password
    """
    from datetime import datetime
    if isinstance(args['args'],str):
        parameters_dict = json.loads(args['args'])
    else:
        parameters_dict = args['args']
    new_api_call = frappe.new_doc("API Response")
    new_api_call.title = "Update User Password"
    new_api_call.data_r_s = str(parameters_dict)
    new_api_call.date_time = datetime.now()
    new_api_call.save(ignore_permissions=True)
    frappe.db.commit()

    update_password(parameters_dict['email'],parameters_dict['password'])

    response = {
        "status": 200,
        "error":"false",
        "message":"User password updated successfully.",
    }
    return response

@frappe.whitelist(allow_guest = True)
def create_student(**args):
    """
        Create child/student info linked to parent
    """
    from datetime import datetime
    if isinstance(args['args'],str):
        parameters_dict = json.loads(args['args'])
    else:
        parameters_dict = args['args']
    new_api_call = frappe.new_doc("API Response")
    new_api_call.title = "Student/child info"
    new_api_call.data_r_s = str(parameters_dict)
    new_api_call.date_time = datetime.now()
    new_api_call.save(ignore_permissions=True)
    frappe.db.commit()
    student = frappe.new_doc("Child Info")
    student.parent_id = parameters_dict["parent_id"]
    student.parent_name = parameters_dict["parent_name"]
    student.child_name = str(parameters_dict['first_name'])+"_"+str(parameters_dict["last_name"])
    student.gender = parameters_dict["gender"]
    student.date_of_birth = parameters_dict["dob"]
    student.customer_relationship = parameters_dict["customer_relationship"]
    student.save(ignore_permissions = True)
    frappe.db.commit()
    response = {
                "status": 200,
                "error": "false",
                "message": "Student created successfully",
                "student":student.name
            }
    return response
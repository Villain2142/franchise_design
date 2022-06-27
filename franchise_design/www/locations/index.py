# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals

import frappe
from frappe.exceptions import DocstatusTransitionError
from frappe.utils import now
from frappe import _


def get_context(context):

    try:
        f_list = frappe.db.sql(
            """select name,name1,contact_number,contact_mail_id,address,address_line_2,city,postcode,longitude,latitude
            from `tabFranchise` where publish=1""", as_dict=1)
        f_list = f_list[::-1]


        context.f_list = f_list
        context.length_list = len(f_list)


    except Exception as e:
        # frappe.local.flags.redirect_location = "/404"
        # raise frappe.Redirect
        print (e)
        context.e = e
    # structured_learning_d = frappe.db.get_list('Manage Courses',{"structured_learning": 1}, fields)


    return context
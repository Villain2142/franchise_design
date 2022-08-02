# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals

import frappe
from frappe.exceptions import DocstatusTransitionError
from frappe.utils import now
from frappe import _


def get_context(context):

    try:
        docname  = frappe.form_dict.docname
        if docname:
            f_doc = frappe.db.sql(
                """select *
                from `tabFranchise` where name=%s""",(docname), as_dict=1)
            context.f_doc = f_doc[0]


    except Exception as e:
        # frappe.local.flags.redirect_location = "/404"
        # raise frappe.Redirect
        print (e)
        context.e = e
    # structured_learning_d = frappe.db.get_list('Manage Courses',{"structured_learning": 1}, fields)


    return context
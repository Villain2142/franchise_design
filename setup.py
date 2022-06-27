from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in franchise_design/__init__.py
from franchise_design import __version__ as version

setup(
	name="franchise_design",
	version=version,
	description="Franchise deisgn template",
	author="Tarun",
	author_email="tarunsairam2142@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)

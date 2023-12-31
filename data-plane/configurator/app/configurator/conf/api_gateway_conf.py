from app.configurator.conf.base import BaseConf
from app.utils.file_utils import *
from app.utils.constant import constant

from os.path import join


class APIGatewayConf(BaseConf):
    def __init__(self, name: str):
        super().__init__(name)

    def generate(self) -> dict:
        part1_path = join(constant.STATIC_CONFIG_PATH, 'api_gateway_part1.txt')
        part2_path = join(constant.STATIC_CONFIG_PATH, 'api_gateway_part2.txt')

        block = read_file(part1_path)
        block += f'\tserver_name {constant.DATA_PLANE_DOMAIN};\n\n'
        block += read_file(part2_path)

        return {'name': self.name, 'content': block}

FROM node:14-alpine

WORKDIR /scripts

COPY scripts/merge_sort.js /scripts/
COPY scripts/measure_js.sh /scripts/
COPY utils/shared_list.txt /data/shared_list.txt

RUN chmod +x /scripts/measure_js.sh

CMD ["/scripts/measure_js.sh"]

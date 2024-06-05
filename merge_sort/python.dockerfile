FROM python:3.9-slim

WORKDIR /scripts

RUN pip install psutil

COPY scripts/merge_sort.py /scripts/
COPY scripts/measure_python.sh /scripts/
COPY utils/shared_list.txt /data/shared_list.txt

RUN chmod +x /scripts/measure_python.sh

CMD ["/scripts/measure_python.sh"]
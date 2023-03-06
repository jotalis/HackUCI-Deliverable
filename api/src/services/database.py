import json
from logging import getLogger
from typing import TypeVar

VT = TypeVar("VT")

log = getLogger(__name__)


class JSONDatabase(dict[str, VT]):
    def __init__(self, path: str):
        """Initialize the database with the file data at the given path."""
        super().__init__()
        self._path = path

        log.info("Loading database from file")
        with open(path) as file:
            try:
                data = json.load(file)
            except json.JSONDecodeError:
                raise ValueError("Specified data file is not serializable.")

        if type(data) != dict:
            raise ValueError("Data file does not contain a valid database.")

        self.update(data)

    def __setitem__(self, key: str, value: VT) -> None:
        if type(key) != str:
            raise TypeError(f"Database key must be str, not {type(key)}")
        return super().__setitem__(key, value)

    def close(self) -> None:
        """Save database by writing to file."""
        log.info("Saving database to file")
        with open(self._path, "w") as file:
            json.dump(self, file, indent=4)